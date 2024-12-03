"use client";

import { GET_ENTITY } from "@/queries/entityQueries";
import { useQuery } from "@apollo/client";
import { use } from "react";

type Props = {
    params: {id: string}
}

const  Details = ({params} : Props) => {

    const { id } = use(params);

    const { loading, error, data } = useQuery(GET_ENTITY, {
        variables: {
            getEntityId: id
        }
        
    });

    if(loading)  return  <p>Loading</p>
    if(error)  return  <p>error</p>

    return (
        <p>  {JSON.stringify(data.getEntity)} </p>
    )
}

export default Details