import BaseUniqueStore, {IBasicOptions} from "./common_class/BaseUniqueStore";




export class SizeStore extends BaseUniqueStore{
    constructor(options: IBasicOptions) {
        super(options);
    }

}

export const sizes = new SizeStore({
    path_addOne: "/size",
    path_deleteOne: '/size',
    path_getAll: '/size',
    path_getUnique: "/size/unique" ,
})


