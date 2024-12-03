"use client";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_ENTITIES } from "@/queries/entityQueries"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import Link from 'next/link'

export default function Home() {

  const CustomButtonComponent = ({data} : {data: { id: number }}) => {
    return  <Link href={`/details/${data.id}`}><button >Details</button></Link>;
};

  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name",},
     { field: "email",},
     { field: "phone",},
     { field: "industry",},
     { field: "contactEmail",},
     { field: 'button', cellRenderer: CustomButtonComponent, flex: 1 },
  ]);


  const { loading, error, data } = useQuery(GET_ENTITIES);

  if(error) return <p>Error try again later</p>

  return (
    <div
    className="ag-theme-quartz" // applying the Data Grid theme
    style={{ height: '70vh' }} // the Data Grid will fill the size of the parent container
   >
     <AgGridReact
     
        loading={loading}
         rowData={data?.getEntities}
         columnDefs={colDefs}
     />
   </div>
  );
}
