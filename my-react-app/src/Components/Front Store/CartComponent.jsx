import React, { useEffect, useState, useCallback } from 'react';

const CartComponent = () => {
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [uniqueProductCount, setUniqueProductCount] = useState(0); // State to hold unique product count

    const fetchCart = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart'); // Adjust the endpoint as necessary
            if (!response.ok) {
                throw new Error('Failed to fetch cart');
            }
            const data = await response.json();
            setCart(data.cart || []); // Ensure cart is an array
            
            // Calculate grand total
            const total = (data.cart || []).reduce((acc, item) => {
                const price = parseFloat(item.amount) || 0; // Convert to number
                return acc + (price * item.quantity);
            }, 0);
            setGrandTotal(total);

            // Fetch unique product count from the API
            const countResponse = await fetch('http://127.0.0.1:8000/api/cart/count'); // Fetch unique product count
            if (!countResponse.ok) {
                throw new Error('Failed to fetch unique product count');
            }
            const countData = await countResponse.json();
            setUniqueProductCount(countData.count); // Set unique product count from backend
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to load cart items.'); // Set error message
        }
    }, []);

    useEffect(() => {
        fetchCart(); // Call fetchCart when the component mounts
    }, [fetchCart]);

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/remove/${id}`, { // Adjusted endpoint
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove item from cart');
            }
            fetchCart(); // Refresh the cart
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to remove item from cart.'); // Set error message
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        if (quantity < 1) return; // Prevent setting quantity to less than 1
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/update/${id}`, { // Adjusted endpoint
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            if (!response.ok) {
                throw new Error('Failed to update item quantity');
            }

            // Update local state immediately
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );

            // Recalculate grand total
            const updatedCart = cart.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            const total = updatedCart.reduce((acc, item) => {
                const price = parseFloat(item.amount) || 0;
                return acc + (price * item.quantity);
            }, 0);
            setGrandTotal(total);

        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to update item quantity.'); // Set error message
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>} 
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <p>Total unique items in cart: {uniqueProductCount}</p> {/* Use the unique product count from the state */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price per Item</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </ tr>
                        </thead>
                        <tbody>
                            {cart.map(item => {
                                const price = parseFloat(item.amount) || 0; // Convert amount to number
                                const totalPrice = price * item.quantity; // Calculate total price

                                return (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td>${price.toFixed(2)}</td>
                                        <td>${totalPrice.toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>
    );
};

export default CartComponent;