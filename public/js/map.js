mapboxgl.accessToken = mapToken;

const mapElement = document.getElementById("map");

if (!mapToken) {
    if (mapElement) {
        mapElement.innerHTML =
            '<p class="text-danger p-3">Map configuration is missing.</p>';
    }
} else if (!listingLocation) {
    if (mapElement) {
        mapElement.innerHTML =
            '<p class="text-muted p-3">Location is not available.</p>';
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

        new mapboxgl.Marker({ color: "#fe424d" })
            .setLngLat(coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`
                        <strong>${listingTitle}</strong>
                        <br>
                        ${listingLocation}
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
                '<p class="text-muted p-3">Unable to load map for this location.</p>';
        }
    });
}
