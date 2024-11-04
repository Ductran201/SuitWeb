import React from "react";
import { useParams } from "react-router-dom";
import HeaderShop from "../../layouts/user/headerShop/HeaderShop";
import FooterShop from "../../layouts/user/footerShop/FooterShop";
import { Button } from "@mui/material";

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <>
      <HeaderShop />
      <p>link....</p>
      <section>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-5">
            <div className="col-span-1">sub image</div>
            <div className="col-span-4">
              <img
                src="https://storage.googleapis.com/download/storage/v1/b/e-commerceapi-a15ef.appspot.com/o/2024-10-28_04-10-4451ww-o5rh7L._AC_SY1000_.jpg?generation=1730063446001603&alt=media"
                alt=""
              />
            </div>
          </div>
          <div>
            <h1>name</h1>
            <div>
              <span>code</span>
              <span>rate</span>
              <span>sold</span>
            </div>
            <b>price</b>
            <p>discount</p>
            <p>people watched</p>
            <p>remain</p>
            <p>
              <b>Color:</b> name
              <div>color imge</div>
            </p>
            <p>
              <b>Sie:</b> name
              <div>Size imge</div>
            </p>
            <div>
              <p>Number </p>
              <p>Add to card</p>
            </div>
            <Button
              sx={{ borderRadius: "20px" }}
              className="radious"
              variant="contained"
              fullWidth
              size="small"
            >
              Payment Now
            </Button>
          </div>
        </div>
      </section>
      <FooterShop />
    </>
  );
}
