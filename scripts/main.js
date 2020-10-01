document.getElementById('library').onclick = function() {
    buttonPickTypePlace(this.id);
};

document.getElementById('art_gallery').onclick = function() {
    buttonPickTypePlace(this.id);
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

        // activating reset function 

document.getElementById('resetSearch').onclick = function() {
    resetSearch();
};


function resetFields() {
    document.getElementById('textLocation').innerHTML = "None";
    document.getElementById('textInterest').innerHTML = "None";
    $("#searchForm")[0].reset();
}
