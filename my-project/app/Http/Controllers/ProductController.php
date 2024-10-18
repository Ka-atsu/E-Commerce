<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products, 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        if($request-> has('image')){
            $file = $request->file('image');

            $originalFileName = pathinfo($_FILES['image']['name'], PATHINFO_FILENAME);
            $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
            $sanitizedFileName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $originalFileName);
            $uniqueId = uniqid('', false);
            $filename = $sanitizedFileName . '(' . $uniqueId . ').' . $extension;

            $path = 'storage/products/';
            $file->move($path, $filename);
            $filePath = $path . $filename; 
        }
    
        // Create a new product in the database
        $product = Product::create([
            'item_name' => $request->input('name'),
            'item_description' => $request->input('description'),
            'item_category' => $request->input('category'),
            'item_available_quantity' => $request->input('quantity'),
            'item_amount' => $request->input('price'),
            'item_barcode' => $request->input('barcode'),
            'item_image' => $filePath, 
            ]);
        
        // Return a JSON response with the created product
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $viewProduct = Product::find($id);

        return response()->json($viewProduct, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
