const express = require('express');
const router = express.Router();
const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index route
//create route
router.route("/")
    .get( wrapAsync(listingController.index))
    .post( isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

router.get('/search',listingController.searchListings);


//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Show Route
//Update route
//Delete Route
router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing,wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;