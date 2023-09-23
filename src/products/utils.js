const excelGenerator = (products, name, response) => {
    const xl = require('excel4node');//xl == excel
    products = products.map((product)=>{
        let id = product._id.toString();
        delete product._id;
        return {
            id,
            ...product
        };
    })

    let wb = new xl.Workbook();//wb es workbook
    let ws = wb.addWorksheet('Inventario');//ws es worksheet
    for(let i = 1; i <= products.length; i++){
        for (let j = 1; j < Object.values(products[0]).length; j++) {
            let data = Object.values(products[i - 1])[j - 1];
            if (typeof data === 'string') ws.cell(i,j).string(data);
            else ws.cell(i,j).number(data);
        }
    }
    
    wb.write(`${name}.xlsx`, response);//si queremos enviar el archivo tenemos que poner el response :D
}

module.exports.ProductsUtils = {
    excelGenerator
};