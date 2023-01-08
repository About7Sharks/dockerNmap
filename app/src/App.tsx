import  DataTable from './components/table'
import {DeviceCountChart} from './components/barChart'
import data from '../../data/data.json'

function App() {
  return (
    <div className="App">
     <DataTable data={data} />
     <DeviceCountChart data={data} />
    </div>
  )
}

export default App
