mapboxgl.accessToken = mapToken;

const mapElement = document.getElementById("map");

if (!mapToken) {
    if (mapElement) {
        mapElement.innerHTML =
            '<div class="p-4 text-center text-muted bg-light rounded-3"><i class="fa-solid fa-map-pin me-2 text-danger"></i>Map configuration is missing.</div>';
    }
} else if (!listingLocation) {
    if (mapElement) {
        mapElement.innerHTML =
            '<div class="p-4 text-center text-muted bg-light rounded-3"><i class="fa-solid fa-location-slash me-2 text-secondary"></i>Location coordinate details are not available.</div>';
    }
} else {
    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(listingLocation)}.json?access_token=${mapToken}&limit=1`
    )
    .then(response => {
        if (!response.ok) {
            throw new Error("Mapbox geocoding request failed");
        }
        return response.json();
    })
    .then(data => {
        if (!data.features || data.features.length === 0) {
            throw new Error("Location not found");
        }

        const coordinates = data.features[0].center;

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            center: coordinates,
            zoom: 11
        });

        map.addControl(new mapboxgl.NavigationControl());

        new mapboxgl.Marker({ color: "#ff385c" })
            .setLngLat(coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`
                        <h6 class="fw-bold mb-1">${listingTitle}</h6>
                        <p class="text-secondary small mb-0">${listingLocation}</p>
                    `)
            )
            .addTo(map);

        map.on("load", () => {
            map.resize();
        });
    })
    .catch(error => {
        console.error("Mapbox error:", error);
        if (mapElement) {
            mapElement.innerHTML =
                '<div class="p-4 text-center text-muted bg-light rounded-3"><i class="fa-solid fa-triangle-exclamation me-2 text-warning"></i>Unable to load map for this location.</div>';
        }
    });
}
