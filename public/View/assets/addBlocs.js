var nbElement = 0;

function creatediv(){
          nbElement += 1;
          var div = document.getElementById('participants');

          var nb = document.getElementById('participantNb');
          nb.innerHTML = nbElement;

          div.innerHTML +=
          '<div id="participant-' + nbElement + '" class="panel-body">' +
              '<div class="panel panel-default">' +
                  '<div class="panel-heading">' +
                      '<i class="fa fa-bar-chart-o fa-fw"></i> Participant <b>n°' + nbElement + '</b>' +
                      '<button type="button" onClick="removeDiv(' + nbElement + ')" class="btn btn-danger btn-xs pull-right"><i class="fa fa-times"></i></button>' +
                  '</div>' +
                  '<div class="panel-body">' +
                      '<div class="row">' +
                          '<div class="col-lg-8">' +
                              '<div class="form-group">' +
                                  '<label>Intitulé du type de participant</label>' +
                                  '<input id="participant-intitule-' + nbElement + '" name="participant-intitule-' + nbElement + '" class="form-control" ng-model="TypePart.intitule" placeholder="Intitulé du type de participant">' +
                              '</div>' +
                          '</div>' +
                          '<div class="col-lg-4">' +
                              '<div class="form-group">' +
                                  '<label>Nombre d\'accompagnants autorisé</label>' +
                                  '<input id="participantNb-' + nbElement + '" name="participant-intitule-' + nbElement + '" class="form-control" ng-model="TypePart.nbMax" placeholder="Nombre max d\'accompagnants pour ce type de Participant">' +
                              '</div>' +
                          '</div>' +
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>';
      }

function removeDiv(id){
     nbElement -= 1;

     var nb = document.getElementById('participantNb');
     nb.innerHTML = nbElement;

     document.getElementById('participant-' + id).remove();
}