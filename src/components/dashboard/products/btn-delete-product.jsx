"use client";
import { deleteProductAction } from "@/actions/product-actions";
import React from "react";
import { Button } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";

const BtnDeleteProduct = ({ id }) => {
	const handleClick = async () => {
		const answer = confirm("Are you sure to delete?");
		if (!answer) return;

		try{
			const res = await deleteProductAction(id);
			if(res.errors.common){
				alert(res.errors.common)
			}
		}
		catch(error){
			console.log(error)
			
		}
		
	};

	return (
		<Button variant="link" onClick={handleClick}>
			<FaRegTrashAlt />
		</Button>
	);
};

export default BtnDeleteProduct;
