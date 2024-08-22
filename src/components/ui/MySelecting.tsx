import React, {FC} from 'react';
import {INameId} from "../../http/http_services/basicHttpService";

interface ISelect {
    data: INameId[] | []
    name?: string

}

const MySelecting: FC<ISelect> = ({data, name}) => {
    return (
        <select name={name}>
            {
                data.map(opt => <option key={opt.id} value={opt.id}>
                    {opt.name}
                </option>)
            }
        </select>
    );
};

export default MySelecting;

