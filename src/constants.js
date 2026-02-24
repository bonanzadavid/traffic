export const BASE_US_RULES = [
    { category: "Right of Way", title: "Right on Red", description: "Allowed after a complete stop unless a sign prohibits it.", icon: "corner-up-right" },
    { category: "Speed Limits", title: "Standard Limits", description: "Residential: 25-30 mph. Highways: 55-70 mph (varies by state).", icon: "gauge" },
    { category: "School Buses", title: "Stop for Buses", description: "You MUST stop for flashing red lights on a school bus from both directions (unless separated by median).", icon: "bus" },
    { category: "Emergency", title: "Move Over Law", description: "You must move over a lane or slow down significantly for stopped emergency vehicles.", icon: "siren" },
    { category: "Alcohol", title: "DUI Limit", description: "Federal standard is 0.08% BAC. Zero tolerance for drivers under 21.", icon: "wine" },
    { category: "Parking", title: "Hydrants", description: "Never park within 15 feet of a fire hydrant.", icon: "square-parking" }
];

export const createUSState = (name, code, lat, lng, uniqueRule = null) => {
    const rules = [...BASE_US_RULES];
    if (uniqueRule) {
        const index = rules.findIndex(r => r.title === uniqueRule.title);
        if (index >= 0) {
            rules[index] = uniqueRule;
        } else {
            rules.unshift(uniqueRule);
        }
    }
    return {
        name: `${name}, USA`,
        flag: "🇺🇸",
        side: "Right",
        units: "MPH",
        emergency: "911",
        countryCode: "US",
        stateCode: code,
        defaultCoords: { lat, lng },
        rules: rules
    };
};

export const US_STATES_LIST = [
    createUSState("Alabama", "AL", 32.3182, -86.9023),
    createUSState("Alaska", "AK", 64.2008, -149.4937, { category: "Headlights", title: "Always On", description: "Headlights strongly recommended at all times due to lighting conditions.", icon: "lightbulb" }),
    createUSState("Arizona", "AZ", 33.7298, -111.4312, { category: "Environment", title: "Stupid Motorist Law", description: "Drivers who become stranded after driving around barricades into flooded areas are liable for rescue costs.", icon: "alert-triangle" }),
    createUSState("Arkansas", "AR", 34.9697, -92.3731),
    createUSState("California", "CA", 36.1162, -119.6816, { category: "Motorcycles", title: "Lane Splitting", description: "Legal for motorcycles to ride between lanes of traffic. Drive with awareness.", icon: "bike" }),
    createUSState("Colorado", "CO", 39.0598, -105.3111, { category: "Winter", title: "Chain Law", description: "Commercial vehicles and sometimes passenger cars MUST carry chains in mountains during winter.", icon: "snowflake" }),
    createUSState("Connecticut", "CT", 41.5978, -72.7554),
    createUSState("Delaware", "DE", 39.3185, -75.5071),
    createUSState("Florida", "FL", 27.7663, -81.6868, { category: "Hazards", title: "Hazard Lights", description: "Use of hazard lights while driving (even in rain) was illegal, now permitted only in extreme circumstances.", icon: "alert-triangle" }),
    createUSState("Georgia", "GA", 33.0406, -83.6431),
    createUSState("Hawaii", "HI", 21.0943, -157.4983, { category: "Culture", title: "Aloha Spirit", description: "Honking is considered extremely rude and aggressive. Only use for emergencies.", icon: "volume-2" }),
    createUSState("Idaho", "ID", 44.2405, -114.4788),
    createUSState("Illinois", "IL", 40.3495, -88.9861),
    createUSState("Indiana", "IN", 39.8494, -86.2583),
    createUSState("Iowa", "IA", 42.0115, -93.2105),
    createUSState("Kansas", "KS", 38.5266, -96.7265),
    createUSState("Kentucky", "KY", 37.6681, -84.6701),
    createUSState("Louisiana", "LA", 31.1695, -91.8678),
    createUSState("Maine", "ME", 44.6939, -69.3819),
    createUSState("Maryland", "MD", 39.0639, -76.8021),
    createUSState("Massachusetts", "MA", 42.2302, -71.5301, { category: "Right of Way", title: "Rotaries", description: "Traffic in the rotary (roundabout) has right of way. Aggressive driving is common.", icon: "circle-dashed" }),
    createUSState("Michigan", "MI", 43.3266, -84.5361, { category: "Turns", title: "Michigan Left", description: "Left turns often prohibited at intersections. You must go straight, U-turn, then turn right.", icon: "corner-up-left" }),
    createUSState("Minnesota", "MN", 45.6945, -93.9002),
    createUSState("Mississippi", "MS", 32.7416, -89.6787),
    createUSState("Missouri", "MO", 38.4561, -92.2884),
    createUSState("Montana", "MT", 46.9219, -110.4544, { category: "Speed Limits", title: "80 MPH", description: "Interstate speed limits are 80 mph. Wildlife hazards are significant.", icon: "gauge" }),
    createUSState("Nebraska", "NE", 41.1254, -98.2681),
    createUSState("Nevada", "NV", 38.3135, -117.0554, { category: "Turns", title: "U-Turns", description: "U-turns generally permitted at intersections unless posted otherwise.", icon: "corner-up-left" }),
    createUSState("New Hampshire", "NH", 43.4525, -71.5639, { category: "Safety", title: "Seat Belts", description: "The only state without a mandatory seat belt law for adults (though highly recommended).", icon: "shield-check" }),
    createUSState("New Jersey", "NJ", 40.2989, -74.5210, { category: "Service", title: "Self-Service Gas", description: "ILLEGAL to pump your own gas. You must wait for an attendant.", icon: "fuel" }),
    createUSState("New Mexico", "NM", 34.8405, -106.2485),
    createUSState("New York", "NY", 42.1657, -74.9481, { category: "Right of Way", title: "Right on Red", description: "PROHIBITED in New York City (and posted areas) unless a sign explicitly allows it.", icon: "ban" }),
    createUSState("North Carolina", "NC", 35.6301, -79.8064),
    createUSState("North Dakota", "ND", 47.5289, -99.7840),
    createUSState("Ohio", "OH", 40.3888, -82.7649),
    createUSState("Oklahoma", "OK", 35.5653, -96.9289),
    createUSState("Oregon", "OR", 44.5720, -122.0709, { category: "Service", title: "Self-Service", description: "Self-service gas is allowed in rural counties, but attendants still common in cities.", icon: "fuel" }),
    createUSState("Pennsylvania", "PA", 40.5908, -77.2098),
    createUSState("Rhode Island", "RI", 41.6809, -71.5118),
    createUSState("South Carolina", "SC", 33.8569, -80.9450),
    createUSState("South Dakota", "SD", 44.2998, -99.4388, { category: "Speed Limits", title: "80 MPH", description: "Interstate speed limits are 80 mph.", icon: "gauge" }),
    createUSState("Tennessee", "TN", 35.7478, -86.6923),
    createUSState("Texas", "TX", 31.0545, -97.5635, { category: "Speed Limits", title: "85 MPH", description: "Some toll roads have the highest legal speed limit in the country (85 mph).", icon: "gauge" }),
    createUSState("Utah", "UT", 40.1500, -111.8624),
    createUSState("Vermont", "VT", 44.0459, -72.7107, { category: "Passing", title: "Double Yellow", description: "Believe it or not, it is legal to pass on a double yellow line if safe (unique to VT).", icon: "arrow-up" }),
    createUSState("Virginia", "VA", 37.7693, -78.1700, { category: "Devices", title: "Radar Detectors", description: "ILLEGAL to use radar detectors. Police can detect them and confiscate them.", icon: "radio" }),
    createUSState("Washington", "WA", 47.4009, -121.4905),
    createUSState("West Virginia", "WV", 38.4912, -80.9545),
    createUSState("Wisconsin", "WI", 44.2685, -89.6165),
    createUSState("Wyoming", "WY", 42.7560, -107.3025)
];

export const TRAFFIC_DATA = {};
US_STATES_LIST.forEach(state => {
    const key = `us_${state.stateCode.toLowerCase()}`;
    TRAFFIC_DATA[key] = state;
});
