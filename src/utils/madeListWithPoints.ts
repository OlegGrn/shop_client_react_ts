


export function madeListWithPoints (list: number[], currentPage: number): (string | number)[]{
    let offset = 5
    if (list.length <= offset + 2) return list //длина 7 => возврат

    return list.reduce((sum: (number | string)[], item, ind, arr) => {
        let currentPageIndex = arr.indexOf(currentPage)
        if (currentPage < offset) {
            if (item <= offset) sum.push(item)
            if (item === offset + 1) sum.push("...")
            if (ind === (arr.length - 1)) sum.push(item)

        } else if (currentPage >= offset) {
            if (ind === 0) sum.push(item)
            if (ind === 1) sum.push("...")

            if (currentPage < arr.length - 3) {
                if (ind === currentPageIndex - 1) sum.push(item)
                if (ind === currentPageIndex) sum.push(item)
                if (ind === currentPageIndex + 1) sum.push(item)
                if (ind === currentPageIndex + 2) sum.push("...")
                if (ind === (arr.length - 1)) sum.push(item)
            } else {
                if (ind >= arr.length - offset) sum.push(item)
            }
        }
        return sum
    }, [])
}