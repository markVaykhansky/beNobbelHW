import React, { useState, useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import { getClassNamesComponents } from './class-names-components-service';

import './App.css';

function App() {
  const [wordCloudSize, setWordCloudSize] = useState(100); // ToDo: Make this configurable
  const [classNamesComponents, setClassNamesComponents] = useState([]);

  useEffect(() => {
    console.log('use effect');
    async function fetchClassNameComponents() {
      const classNamesComponents = await getClassNamesComponents(wordCloudSize);
  
      const classNameComponentToValueAndCount = {};
  
      classNamesComponents.forEach((classNameComponent) => {
        if(classNameComponentToValueAndCount[classNameComponent] === undefined) {
          classNameComponentToValueAndCount[classNameComponent] = { 
            value: classNameComponent,
            count: 0
          };
        }
  
        classNameComponentToValueAndCount[classNameComponent].count++;
      });    
  
      const dataInTagCloudFormat = Object.values(classNameComponentToValueAndCount);
      setClassNamesComponents(dataInTagCloudFormat);
    }
    fetchClassNameComponents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Class Names Components word cloud!
        </p>
        <TagCloud
          minSize={1}
          maxSize={wordCloudSize}
          tags={classNamesComponents}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
      </header>
    </div>
  );
}

export default App;
