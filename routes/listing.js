const express = require('express');
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js")
const multer = require("multer");
const upload = multer({dest:'uploads/'});
//Index route
//create route
router.route("/")
    .get( wrapAsync(listingController.index))
    .post( isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Show Route
//Update route
//Delete Route
router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner, validateListing,wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
 

module.exports = router;