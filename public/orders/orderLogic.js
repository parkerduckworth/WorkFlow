/**
 * Created by ericd34n on 7/2/17.
 */


function calculateDeliveredVolume(deliveryStartVolume, deliveryEndVolume){
    var deliveredActual = deliveryEndVolume - deliveryStartVolume;
    return deliveredActual;
}

function setDeliveredVolume(_id, s, e){
    var vol = document.getElementById(_id);
    vol.value = calculateDeliveredVolume(s, e);
    return vol.value
}