console.log('main is loading')
// console.log($('#hotels h4').text())
var state = {
    idx: 0,
    days: [
        {
            hotels: [1, 10],
            restaurants: [5,7],
            activities: [1, 2]
        },
        {},
        {}
    ]
}

function generateList(containerId, category) {
    var container = $(containerId)
    var lis = category.map(function(item) {
        return `<option val=${item.id} >${item.name}</option>`
    });
    var category = containerId.slice(1)
    container.append(`<select id="${category}-selector">${lis}</select>`)
}

generateList('#hotels', hotels);
generateList('#restaurants', restaurants);
generateList('#activities', activities);



$(".item-btn").on('click',  function() {
    var chosenItem = $($(this).attr('data-selector')).val()
    var dataType = $(this).attr('data-type')
    var categoryCollection = window[$(this).attr('data-type')]
    var selectedItemId = categoryCollection.filter(function(item) {
        return item.name === chosenItem
    })[0].id

    addItemToDay(state.idx, selectedItemId, dataType )
});

function addItemToDay(idx, itemId, category) {
    if(!state.days[idx][category]) {
        state.days[idx][category] = [itemId]
    } else if(!state.days[idx][category][itemId]) {
        state.days[idx][category].push(itemId)
    }
    renderDayView()
}

function renderDayView() {
    var currHotels = state.days[state.idx].hotels || ""; // array of ids
    var currRestaurants = state.days[state.idx].restaurants || ""; // array of ids
    var currActivities = state.days[state.idx].activities || ""; // array of ids

    var hotelNames = hotels.filter(function(hotel) {
        if(currHotels.indexOf(hotel.id*1) > -1) {
            return hotel
        }
    });

    var restaurantNames = restaurants.filter(function(rest) {
        if(currRestaurants.indexOf(rest.id*1) > -1) {
            return rest
        }
    });

    var activityNames = activities.filter(function(activity) {
        if(currActivities.indexOf(activity.id*1) > -1) {
            return activity
        }
    });

    $('.my-hotels').text('');
    hotelNames.forEach(function(hotel) {
        $('.my-hotels').append(`${hotel.name}<br>`);
    })

    $('.my-restaurants').text('');
    restaurantNames.forEach(function(rest) {
        $('.my-restaurants').append(`${rest.name}<br>`);
    })

    $('.my-activities').text('');
    activityNames.forEach(function(activity) {
        $('.my-activities').append(`${activity.name}<br>`);
    })

    // console.log('hotelNames', hotelNames)
}


$('.day-buttons button').on('click', function() {
    state.idx = ($(this).text()*1) - 1;
    $('button').removeClass('current-day');
    $(this).addClass('current-day');
    renderDayView()
});




renderDayView()


