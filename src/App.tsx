
import simless from './utils';
import { lessStr } from "./test/index";

function App() {
  
  return (
    <div style={{padding:'20px',display:'flex', justifyContent:'space-evenly'}}>
      <div>
        <h2>转化前样式</h2>
        <pre>{lessStr}</pre>
      </div>
      <div>
        <h2>转化后样式</h2>
        <pre>
            {simless(lessStr)}
        </pre>
      </div>  
    </div>
  );
}

export default App;
