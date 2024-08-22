import {INameId} from "../../../http/http_services/basicHttpService";

export class OptionSrc {
    value: string | undefined;
    title: string | undefined;

    constructor(num: number | null) {
        if (num !== null) {
            this.value = num.toString()
            this.title = this.value
        }
    }
}

export class OptionSrcAdmin extends OptionSrc {
    constructor(data: INameId) {
        super(null)
        this.value = data.id.toString()
        this.title = typeof data.name === "string"
            ? data.name
            : data.name.toString()
    }
}


export function madeListLimit(arr: number[]) {
    return arr.map(num => new OptionSrc(num))
}

export function madeListAdmin(arr: INameId[]){
    return arr.map(item => new OptionSrcAdmin(item))
}


