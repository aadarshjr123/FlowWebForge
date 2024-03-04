import React, { useEffect } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';



const BPMNDiagram = ({ diagramXML }) => {
  useEffect(() => {
    const modeler = new BpmnModeler({
      container: '#js-canvas',
      keyboard: {
        bindTo: window
      },
      readOnly: true, 
    });

    async function openDiagram(xml) {
      const container = document.getElementById('js-canvas');
      try {
        await modeler.importXML(xml);
        container.classList.remove('with-error');
        container.classList.add('with-diagram');
        console.error("err no");
      } catch (err) {
        container.classList.remove('with-diagram');
        container.classList.add('with-error');
        container.querySelector('.error pre').textContent = err.message;
        console.error(err);
        console.error("err");

      }
    }

    openDiagram(diagramXML);
  }, [diagramXML]);

  return (
    <div id="js-canvas" style={{ height: '800px', width: '100%' }}>
      <div className="error">
        <pre></pre>
      </div>
    </div>
  );
};

export default BPMNDiagram;
