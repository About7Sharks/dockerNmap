import fs from 'fs';
import xml2js from 'xml2js';

const xmlParser = new xml2js.Parser();
const parseNmap = async (path) => {
  let data =  fs.readFileSync(path)
  let { nmaprun: { host } } = await xmlParser.parseStringPromise(data)
  return host.map((host) => {
    const ipv4AddressElem = host.address.find(address => address['$'].addrtype === 'ipv4');
    const ipv4Address = ipv4AddressElem['$'].addr;
    const macAddressElem = host.address?.find(address => address['$'].addrtype === 'mac');
    const macAddress = macAddressElem ? macAddressElem['$'].addr : null;
    const vendor = macAddressElem ? macAddressElem['$'].vendor : null;
    const hostname = host.hostnames[0]?.hostname?.map(hostname => hostname['$'].name)[0] || null;
    return { ip: ipv4Address, mac: macAddress, vendor, hostname };
  });
};

// Compare current run to saved data
const compareFiles = async () => {
  let savedData;
  try {
    savedData = JSON.parse(fs.readFileSync('./data/data.json'));
  } catch (error) {
    console.error(error);
    savedData = [];
  }
  let newData = await parseNmap('./data/scan.xml')
  savedData.forEach(saved => {
    saved.online = false;
    newData.forEach(currentData => {
      if (currentData.mac === saved.mac) {
        saved.online = true;
        saved.count = saved.count ? saved.count + 1 : 1;
        console.log(`${currentData.mac} was last seen on ${saved.lastSeen}.`);
        saved.lastSeen = new Date().toISOString();
      }
    });
  });
  newData.forEach(currentData => {
    let isNewDevice = true;
    savedData.forEach(saved => {
      if (currentData.mac === saved.mac) {
        isNewDevice = false;
      }
    });
    if (isNewDevice) {
      console.log(`${currentData.mac} is a new device.`);
      currentData.lastSeen = new Date().toISOString();
      currentData.firstSeen = new Date().toISOString();
      currentData.online = true;
      savedData.push(currentData);
    }
  });
  return savedData;
}

// Write to file
const saveFile = async (data) => {
  fs.writeFile('./data/data.json', JSON.stringify(data), (err) => console.error(err))
}

// Run
(async () => {
  await saveFile(await compareFiles());
})()
