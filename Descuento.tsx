import { useState } from "react";
const Descuento = () => {
    const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
    const [descuento, ] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [selectedProductsList, setSelectedProductsList] = useState<BorraIma[]>([]);
    const aplicarDescuento = () => {
        const descuentoDecimal = descuentoPorcentaje - descuento;
        const newData = imageData.map((item) => {
          if (selectedProducts.has(item)) {
            const precioConDescuento = calcularPrecioConDescuento(item.precio, descuentoDecimal);
            return {
              ...item,
              precio: precioConDescuento,
            };
          }
          return item;
        });
    
        setImageData(newData);
      };
    const calcularPrecioConDescuento = (precio: string , porcentaje: string | number) => {
        const descuento = (Number(porcentaje) / 100) * parseFloat(precio);
        const precioConDescuento = parseFloat(precio) - descuento;
        return precioConDescuento.toString();
        };
    const calcularPrecioConDescuentoGlobal = (precio: string, porcentaje: string, descuentoGlobal: number) => {
        const precioConDescuento = calcularPrecioConDescuento(precio, porcentaje);
        const descuentoDecimal = descuentoGlobal / 100;
        const precioConDescuentoGlobal = parseFloat(precioConDescuento) * (1 - descuentoDecimal);
        return precioConDescuentoGlobal.toFixed(2);
      };
      const restoreOriginalPrice = (product: BorraIma) => {
        const updatedData = imageData.map((item) => {
          if (item === product) {
            return {
              ...item,
              precio: item.precioOriginal, // Restaura el precio original
            };
          }
          return item;
        });
        setImageData(updatedData);
      };
      const handleSelectProduct = (product: BorraIma) => {
        const updatedSelectedProducts = new Set(selectedProducts);
        if (updatedSelectedProducts.has(product)) {
          updatedSelectedProducts.delete(product); // Deseleccionar el producto
        } else {
          updatedSelectedProducts.add(product); // Seleccionar el producto
        }
        setSelectedProducts(updatedSelectedProducts);
   
        // Actualizar la lista de productos seleccionados
     const selectedList = imageData.filter((data) => updatedSelectedProducts.has(data));
     setSelectedProductsList(selectedList);
      };
    return (
        <div>
            {/*              <td><input type='checkbox' checked={selectedProducts.has(data)} onChange={() => handleSelectProduct(data)}/></td> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Descuento Global</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div>              
                    {selectedProductsList.map((data, index: number) => (
                      <>
                      <table>
                        <th key={index}><strong>{data.name}</strong></th>
                        <td key={index}>{calcularPrecioConDescuentoGlobal(data.precio, data.porcentaje, descuentoPorcentaje)}</td>
                        <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={() => restoreOriginalPrice(data)}>Restaurar</button>
                      </table>
                      </>
                        
                    ))}
                </div>
              <input type="number" value={descuentoPorcentaje} onChange={(e) =>{
                const inputValue = parseFloat(e.target.value);
                if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
                  setDescuentoPorcentaje(inputValue);
                }
              }}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={aplicarDescuento}>Aplicar descuento</button>
            </div>
          </div>
        </div>
      </div>
      </div>
        
    )
}
export default Descuento