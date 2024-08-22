
import React from "react";
import BaseStore from "../store/common_class/BaseStore";


export class SubmitBlock {

    static check(name: string, regExp: RegExp | undefined, typeInput: string | undefined):boolean {

        let candidate = name.trim()
        if (candidate.length === 0) {
            return false
        }

        if (typeInput === "number") {
            return (+candidate > 2 && +candidate < 50)

        } else if(regExp) {
            return regExp.test(candidate)
        }
        return true
    }



    static addOne(
        {valid, setValid, setTitle, store, label,regExp, typeInput}: {
            valid: boolean,
            setValid: React.Dispatch<React.SetStateAction<boolean>>,
            setTitle: React.Dispatch<React.SetStateAction<string>>,
            store: BaseStore
            label: string,
            typeInput: string | undefined
            regExp: RegExp | undefined
        }
    ) {
        return async function (e: any) {
            e.preventDefault();
            let name: string = e.target.name.value;
            let test = SubmitBlock.check(name, regExp, typeInput)
            if (!test) {
                return setValid(false)
            }
            if (test && !valid) setValid(true)
            let response = await store.addData(name)
            setTitle(response.message)
            if (response.status === 200) {
                e.target.name.value = "";
                setTimeout(() => setTitle(
                    `Добавить ${label.toLowerCase()}`
                ), 2000)
            }
        }
    }
}





























