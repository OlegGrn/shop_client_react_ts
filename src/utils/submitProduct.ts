import {regValidDesc, regValidName} from "./regularExp";
import ProductStore from "../store/productStore";
import {DESCRIPTION, ID_SIZE, IMG, NAME, PRICE, QUANTITY, SIZES} from "./consts";

interface ISizes {
    id_size: number,
    quantity: number
}

//получаем store и event
//из event делаем formData (madeFormData возвращает formData)
//передаем formData в validFormData для валидации
//если ок, создаем товар


export default class SubmitProduct {

    static madeFormData(e: any) {
        // Файлы с фотографиями добавятся в FormData. Не нужно беспокоится насчет пустых
        // полей с именем "img". В дальнейшем axios пустые строки удалит и отправит на сервер
        // поле "img" где будет массив (если фото > 1 или один объект.
        let form = e.target
        let formData = new FormData(form)

        // @ts-ignore //для наглядности
        /*for (let [name, value] of formData) {
            if(name !== "img") {
                console.log(name + ": " + value)
            } if(name === "img"){
                console.log(name + " = " + value.size)
               console.log(value)
                console.log(typeof value)
            }
        }*/


        let sizes: ISizes[] = []
        //проходимся по всем форме
        // @ts-ignore
        for (let [name, value] of formData) {
            //создаем массив данных ISizes[] из разрозненных записей
            if (name === ID_SIZE) {
                //сначала находим первую половинку
                sizes.push({id_size: +value, quantity: 0})
            }
            if (name === QUANTITY && sizes.length > 0) {
                // находим вторую половинку, и корректируем предпоследнюю запись
                sizes[sizes.length - 1].quantity = +value
            }
        }


        // полученный массив конвектируем в Json и сохраняем в formData
        formData.append(SIZES, JSON.stringify(sizes))

        return formData
    }


    static validSizes(sizes: ISizes[]): string | false {

        if(sizes.length === 0) return false

        // суммируем количества по однотипным размерам
        let result = sizes.reduce((sum: ISizes[],
                                   {id_size, quantity}
        ) => {
            //если количество 0 - пропускаем
            if (quantity === 0) return sum
            //если это первая запись в результате
            if (sum.length === 0) {
                sum.push({id_size, quantity})
            } else {
                // если записи уже есть, ищем есть ли записи с таким размером
                let finding = sum.find(item => item.id_size === id_size)
                if (finding) {
                    // если находим, суммируем количества
                    finding.quantity += quantity
                } else {
                    //если нет, создаем новую запись
                    sum.push({id_size, quantity})
                }
            }
            return sum
        }, [])

        return (result.length > 0 ? JSON.stringify(result) : false)
    }

    static validFormData(formData: FormData) {
        let validName: boolean = true;
        let validDesc: boolean = true;
        let validPrice: boolean = true;
        let validSizes;

        // @ts-ignore
        for (let [name, value] of formData) {
            if (name === NAME && !regValidName.test(value)) {
                validName = false

            }
            if (name === DESCRIPTION && !regValidDesc.test(value)) {
                validDesc = false
            }
            if (name === PRICE && value.length === 0) {
                validPrice = false
            }
            if (name === SIZES) {
                validSizes = this.validSizes(JSON.parse(value))
            }
        }

        return {
            validName, validDesc, validPrice, validSizes
        }
    }

    static async submitAddProduct(e: any, products: ProductStore) {
        //делаем форму
        let formData = this.madeFormData(e)

        // валидируем данные, на выходе false/true or string(for validSizes)
        let {validName,
            validDesc,
            validPrice,
            validSizes} = this.validFormData(formData)

        if (!validName || !validDesc || !validPrice || !validSizes) {
            // возвращаем значения валидации для подсветки неверных данных и заголовок
            return {
                validName, validDesc, validPrice, validSizes,
                message: "Неполные данные"
            }
        }
        // устанавливаем новое значение для sizes формата JSON в formData
        formData.set(SIZES, validSizes)
        // создаем новый товар и получаем ответ
        let response = await products.createProduct(formData)
        // возвращаем значения валидации true для всех и сообщение для заголовка
        return {validName, validDesc, validPrice, validSizes, message: response.message}

    }

}