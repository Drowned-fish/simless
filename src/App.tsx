
import simless from './utils';
import { lessStr } from "./test/index";

function App() {
  
  return (
    <>
    <h2>转化前样式</h2>
    <pre>{lessStr}</pre>
    <h2>转化后样式</h2>
    <pre>
      {simless(lessStr)}
    </pre>
    </>
  );
}

export default App;
