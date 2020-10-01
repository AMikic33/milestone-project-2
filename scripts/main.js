document.getElementById('library').onclick = function() {
    buttonPickPlaceType(this.id);
    // Remove active from any other button
    // this.classList = this.classList + " active";
};

document.getElementById('art_gallery').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('book_store').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('movie_theater').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('attraction').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('museum').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('stadium').onclick = function() {
    buttonPickPlaceType(this.id);
};

document.getElementById('city_hall').onclick = function() {
    buttonPickPlaceType(this.id);
};

/* ... */
document.getElementById('resetSearch').onclick = function() {
    resetSearch();
};

document.getElementById('showResults').onclick = function() {
    requestLocations();
};

function resetFields() {
    document.getElementById('textLocation').innerHTML = "None";
    document.getElementById('textInterest').innerHTML = "None";
    document.getElementById('searchForm').reset();
}
