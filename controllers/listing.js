// this file contains all the call back functions implemented in listings
const Listing = require('../models/listing.js');
 
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });
// stylesService exposes listStyles(), createStyle(), getStyle(), etc.
// index 
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render('listings/index.ejs',{allListings}); 
}
// new Route
module.exports.new = (req,res)=>{
    res.render('listings/new.ejs')
}

// create
module.exports.create = async(req,res,next)=>{
 

    let response = await geoCodingClient.forwardGeocode({
        query:req.body.listing.location,
        limit: 1
      })
        .send()
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,'..',filename);
    const newListing = new Listing(req.body.listing);
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    // console.log(newListing);
    newListing.owner = req.user._id;

    req.flash('success','new listing created');
    let savedListing = await newListing.save();
    console.log(savedListing);
    res.redirect('/listings');
}

// update
module.exports.update = async(req,res)=>{
    let {id} = req.params; 
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined")
    {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename,url};
        await listing.save();
    }
    req.flash('success','listing updated successfully');
    res.redirect(`/listings/${id}`);
 
}

// show

module.exports.show = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    if(!listing)
   {
       req.flash('error','Listing you requested does not exist');
       res.redirect('/listings');
   }
   console.log(listing);
    res.render('listings/show.ejs',{listing});
}

// edit
module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    
     
    const listing = await Listing.findById(id);
    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace('/upload','/upload/h_150,w_200');
    res.render('listings/edit.ejs',{listing,originalImgUrl});
}

// delete

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    req.flash('success','listing deleted successfully');
    let DeleteListing = await Listing.findByIdAndDelete(id);
    console.log(DeleteListing);
    res.redirect('/listings');
}