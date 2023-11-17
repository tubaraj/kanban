import React, { useRef,useState,useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from "ag-grid-react";
import { useParams } from "react-router-dom";
import { PlusOutlined,DeleteOutlined,EditOutlined } from '@ant-design/icons';


import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './styles.css';
import ModalDesc from '../components/ModalDesc';
import { base_url } from "../constants";
import axios from "axios";
import { Button } from 'antd';

const baseDefaultColDef = {
    width: 80,
    sortable: true,
    filter: true,
    resizable: true,
  };
  
  const baseGridOptions = {
    getRowId: (params) => {
      return params.data._id;
    },
    rowClassRules: {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    },
    rowDragManaged: true,
      animateRows: true,
};
  

function Kanban() {
  const params = useParams();
  const { id } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [task, setTask] = useState(null);



  const leftGridRef = useRef(null);
  const rightGridRef = useRef(null);
  const middleGridRef = useRef(null);


  const checkGrid = (transaction,data) => {
    const rowIsInLeftGrid = !!leftGridRef.current.api.getRowNode(data._id);
    if (rowIsInLeftGrid) {
      leftGridRef.current.api.applyTransaction(transaction);
    }

    const rowIsInRightGrid = !!rightGridRef.current.api.getRowNode(data._id);
    if (rowIsInRightGrid) {
      rightGridRef.current.api.applyTransaction(transaction);
      }
      
      const rowIsInMiddleGrid = !!middleGridRef.current.api.getRowNode(data._id);
      if (rowIsInMiddleGrid) {
          middleGridRef.current.api.applyTransaction(transaction);
      }
}
  const handleDelete = async(values) => {
    try {
      const transaction = {
        remove: [values],
      };
      checkGrid(transaction,values)
      const response = await axios.delete(`${base_url}/task/${values._id}`);
      return response.data
    } catch (error) {
      console.log(error)
    }
  };
  
  const handleOpen = (e) => {
    setTask(e)
    setIsModalOpen(true)
  };
    
    const leftColumnDefs = [
      { field: 'name', headerName: 'Todo', flex:2.1, dndSource: true, sortable: true },
      { field: 'delete', headerName: '', flex: 0.9, cellRenderer: (values) => <><DeleteOutlined onClick={() => handleDelete(values.data)} /><EditOutlined className='edit-me' onClick={()=>handleOpen(values.data)}/></> },
  ];
  const rightColumnDefs = [
      { field: 'name',headerName: 'Complete', dndSource: true,flex: 2.1,sortable: true },
      { field: 'delete', headerName: '', flex: 0.9, cellRenderer: (values) => <><DeleteOutlined onClick={() => handleDelete(values.data)} /><EditOutlined className='edit-me' onClick={()=>handleOpen(values.data)}/></> },
  ];
  const middleColumnDefs = [
      { field: 'name',headerName: 'In Progress',dndSource: true, flex:2.1,sortable: true},
      { field: 'delete', headerName: '', flex: 0.9, cellRenderer: (values) => <><DeleteOutlined onClick={() => handleDelete(values.data)} /><EditOutlined className='edit-me' onClick={()=>handleOpen(values.data)}/></> },
  ];
    
    const leftGridOptions = {
      ...baseGridOptions,
      columnDefs: [...leftColumnDefs],
      defaultColDef: {
        ...baseDefaultColDef,
        },
    };
    
    const rightGridOptions = {
      ...baseGridOptions,
      columnDefs: [...rightColumnDefs],
      defaultColDef: {
        ...baseDefaultColDef,
      },
  };
    
  const middleGridOptions = {
      ...baseGridOptions,
      columnDefs: [...middleColumnDefs],
      defaultColDef: {
        ...baseDefaultColDef,
      },
    };
    

  const getTasks = async() => {
    try {
      const response = await axios.get(`${base_url}/task/${id}`);
      return response.data
    } catch (error) {
      console.log(error)
    }
  };

  const updateTask = async(value) => {
    try {
      const response = await axios.patch(`${base_url}/task/${value._id}`,value);
      setIsModalOpen(false)
      return response.data
    } catch (error) {
      console.log(error)
    }
  };

  
  const onLeftGridReady = async (params) => {
    const data = await getTasks()
    const todos = data?.filter((i) => i.status === "TODO");
    params.api.setRowData(todos);
    };
  
  const onRightGridReady = async (params) => {
    const data = await getTasks()
    const todos = data?.filter((i) => i.status === "COMPLETE");
    params.api.setRowData(todos);
  };

  const onMiddleGridReady = async (params) => {
    const data = await getTasks()
    const todos = data?.filter((i) => i.status === "PROGRESS");
    params.api.setRowData(todos);
};

  
  
    const binDrop = (event) => {
      event.preventDefault();
      const jsonData = event.dataTransfer.getData('application/json');
      const data = JSON.parse(jsonData);
  
      // if data missing or data has no id, do nothing
      if (!data || data._id == null) {
        return;
      }
  
      const transaction = {
        remove: [data],
      };

      checkGrid(transaction,data)
  
      // const rowIsInLeftGrid = !!leftGridRef.current.api.getRowNode(data._id);
      // if (rowIsInLeftGrid) {
      //   leftGridRef.current.api.applyTransaction(transaction);
      // }
  
      // const rowIsInRightGrid = !!rightGridRef.current.api.getRowNode(data._id);
      // if (rowIsInRightGrid) {
      //   rightGridRef.current.api.applyTransaction(transaction);
      //   }
        
      //   const rowIsInMiddleGrid = !!middleGridRef.current.api.getRowNode(data._id);
      //   if (rowIsInMiddleGrid) {
      //       middleGridRef.current.api.applyTransaction(transaction);
      //   }
    };
  
  
    const gridDragOver = (event) => {
        const dragSupported = event.dataTransfer.types.length;
  
      if (dragSupported) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
        }
    };
  
    const gridDrop = async (grid, event) => {
        event.preventDefault();

      const jsonData = event.dataTransfer.getData('application/json');
      const data = JSON.parse(jsonData);

        // if data missing or data has no id, do nothing
        if (!data || data._id == null) {
          return;
        }
      
        const gridApi =
          grid === 'left' ? leftGridRef.current.api : grid === 'middle' ? middleGridRef.current.api : rightGridRef.current.api;
      
        // do nothing if row is already in the grid, otherwise we would have duplicates
        const rowAlreadyInGrid = !!gridApi.getRowNode(data._id);
        if (rowAlreadyInGrid) {
          console.log('not adding row to avoid duplicates in the grid');
          return;
      }
      
      
        const transaction = {
          add: [data],    // Add to the destination grid
          remove: [data], // Remove from the source grid
        };
      gridApi.applyTransaction(transaction);
      

      if (grid === 'right') {
        data.status = 'COMPLETE'
      }
      else if (grid==='middle') {
        data.status = 'PROGRESS'
      }
      else {
        data.status = 'TODO'
      }
      await updateTask(data)
    };
    
  return (
    <>
      <Button onClick={() => {
        setTask(null)
        setIsModalOpen(true)
      }} style={{marginBottom:"20px",marginLeft:"90%"}}><PlusOutlined />Task</Button>
      <br/>
        <div className="outer">
        <div
          style={{ height: 400 }}
          className="inner-col ag-theme-alpine-dark"
          onDragOver={gridDragOver}
                onDrop={(e) => {
                    binDrop(e)
                    gridDrop('left', e)
                }}
        >
          <AgGridReact
            ref={leftGridRef}
            gridOptions={leftGridOptions}
            onGridReady={onLeftGridReady}
            // onRowClicked={handleOpen}
          />
        </div>
  
        <div
          style={{ height: 400 }}
         // className="ag-theme-alpine-dark-dark"
          className="inner-col ag-theme-alpine-dark"
          onDragOver={gridDragOver}
                onDrop={
                    (e) => {
                        binDrop(e)
                        gridDrop('middle', e)
                    }
                }
        >
          <AgGridReact
            ref={middleGridRef}
            gridOptions={middleGridOptions}
            onGridReady={onMiddleGridReady}
            // onRowClicked={handleOpen}
          />
            </div>
            <div
          style={{ height: 400 }}
         // className="ag-theme-alpine-dark-dark"
          className="inner-col ag-theme-alpine-dark"
          onDragOver={gridDragOver}
                onDrop={(e) => {
                    binDrop(e)
                    gridDrop('right', e)
                }}
        >
          <AgGridReact
            ref={rightGridRef}
            gridOptions={rightGridOptions}
            onGridReady={onRightGridReady}
            // onRowClicked={handleOpen}
          />
        </div>
        <ModalDesc
          data={task}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          update={updateTask}
          id={id}
          leftGridRef={leftGridRef}
        />
      </div>
      </>
  
  )
}

export default Kanban