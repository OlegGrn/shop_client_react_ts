import BaseUniqueStore, {IBasicOptions} from "./common_class/BaseUniqueStore";


export class CategoryStore extends BaseUniqueStore {
    constructor(options: IBasicOptions) {
        super(options);
    }

}


export const categories = new CategoryStore({
    path_addOne: "/category",
    path_deleteOne: '/category',
    path_getAll: '/category',
    path_getUnique: "/category/unique" ,
})


