({


        doInit: function(component, event, helper) {
            console.log('Inside Doinit of approval item');
            var action = component.get("c.wrapperClass");
            action.setCallback(this, function(result) {
                var state = result.getState();
                if (component.isValid() && state === "SUCCESS"){
                    var resultData = result.getReturnValue();
                    console.log('resultData',resultData);
                    if(resultData.length > 0){
                        component.set('v.columns', [
                          {label: 'Name', fieldName: 'Tito_Request_Name', type: 'text',sortable: true,initialWidth: 100, cellAttributes: {"class": {"fieldName": "showClass"}}},
                          {label: 'Requester', fieldName: 'Tito_Requester', type: 'text',sortable: true,initialWidth: 100, cellAttributes: {"class": {"fieldName": "showClass"}}},
                          {label: 'Title', fieldName: 'Title', type: 'text',initialWidth: 100, cellAttributes: {"class": {"fieldName": "showClass"}}},
                          {
                            type:  'button',
                            typeAttributes: 
                            {
                             // iconName: 'utility:preview',
                              label: 'View', 
                              name: 'ViewRecord', 
                              title: 'View this Item to approve.', 
                              disabled: false, 
                              value: 'View'
                            }
                          },
                        ]);
                        component.set("v.DataList", resultData);
                        component.set("v.totalRecords", resultData.length);
                        var totalRecordsToDisplayVar = component.get("v.totalRecordsToDisplay");
                        var vDataList = [];
                        var tableLength;
                        for(var i=0; i<totalRecordsToDisplayVar; i++){
                           // console.log('Id='+resultData[i].Id);
                           if(resultData[i]){
                            vDataList.push(resultData[i]);
                           }
                            
                        }
                        console.log('vDataList=',vDataList);
                        component.set("v.PagedData", vDataList);
                    }
                    else{
                         component.set("v.showNoRecordMessage", true);
                    }
            }

            });
        $A.enqueueAction(action);
        },
    loadMore: function(component, event, helper) {
        var DataListVar = component.get("v.DataList");
        if(DataListVar.length > 0){
             var currentPageData = component.get("v.PagedData");
             var lengthOfRecords = component.get("v.PagedData").length;
             var totalRecordsToDisplayVar = component.get("v.totalRecordsToDisplay");
             component.set("v.spinner",true);
             var vDataList = [];
             for(var i=lengthOfRecords; i< lengthOfRecords + totalRecordsToDisplayVar; i++){
                    if(DataListVar[i] != undefined){
                        vDataList.push(DataListVar[i]);
                    }
             }
             var concatData = currentPageData.concat(vDataList);
             setTimeout(function(){
             component.set("v.spinner",false)
             component.set("v.PagedData",concatData);
             event.getSource().set("v.isLoading", false);
             }, 1000);
        }
    },
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    updateColumnSorting2: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    handleRowAction: function(cmp, event, helper){
        console.log('handleRowAction');
     var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'ViewRecord':
                helper.navigateToWorkItem(cmp, event);
                break; 
                default:
                return;

                
        }
        
    },
})