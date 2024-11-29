<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addToCart(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'product_id' => 'required|integer|exists:products,id', 
            'name' => 'required|string',
            'amount' => 'required|numeric',
            'quantity' => 'required|integer|min:1',
        ]);

        // Check if the product already exists in the cart
        $cartItem = Cart::where('product_id', $validatedData['product_id'])->first();

        if ($cartItem) {
            // Update the quantity if the product is already in the cart
            $cartItem->quantity += $validatedData['quantity'];
            $cartItem->save();
        } else {
            // Add the new product to the cart
            Cart::create([
                'product_id' => $validatedData['product_id'],
                'name' => $validatedData['name'],
                'amount' => $validatedData['amount'],
                'quantity' => $validatedData['quantity'],
            ]);
        }

        return response()->json(['status' => 200, 'message' => 'Product added to cart successfully.']);
    }

    public function getCartCount()

    {

        $uniqueProductCount = Cart::where('user_id', auth()->id())->distinct('product_id')->count('product_id');


        return response()->json(['count' => $uniqueProductCount]);

    }

    /**
     * Get the current cart.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCart()
    {
        // Retrieve the cart items for the authenticated user
        $cart = Cart::where('user_id', auth()->id())->get();

        return response()->json(['status' => 200, 'cart' => $cart]);
    }

    /**
     * Remove a product from the cart.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function removeFromCart($id)
    {
        // Find the cart item for the authenticated user
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();

        if ($cartItem) {
            $cartItem->delete(); // Remove the product from the cart
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product removed from cart successfully.',
            'cart' => Cart::where('user_id', auth()->id())->get(),
        ]);
    }

    /**
     * Update the quantity of a product in the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updateCart(Request $request, $id)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Find the cart item for the authenticated user
        $cartItem = Cart::where('id', $id)->where('user_id', auth()->id())->first();

        if ($cartItem) {
            $cartItem->quantity = $validatedData['quantity']; // Update the quantity
            $cartItem->save(); // Save changes
        }

        return response()->json([
            'status' => 200,
            'message' => 'Cart updated successfully.',
            'cart' => Cart::where('user_id', auth()->id())->get(),
        ]);
    }
}