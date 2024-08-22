import React, {FC} from 'react';
import MySelecting from "./ui/MySelecting";
import {INameId} from "../http/http_services/basicHttpService";


interface IProductSelect{
    data: INameId[] | []
    name: string
    label: string


}

const ProductSelect: FC<IProductSelect> = ({data, name, label}) => {
    return (
        <div>
            <span>{label}: </span>
            <MySelecting name={name} data={data}/>
        </div>
    );
};

export default ProductSelect;






