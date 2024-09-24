
import BaseUniqueStore, {IBasicOptions} from "./common_class/BaseUniqueStore";


export class TypeStore extends BaseUniqueStore {

    constructor(options: IBasicOptions) {
        super(options);
    }
}

export const types = new TypeStore({
    path_addOne: "/type",
    path_deleteOne: '/type',
    path_getAll: '/type',
    path_getUnique: "/type/unique" ,
})











