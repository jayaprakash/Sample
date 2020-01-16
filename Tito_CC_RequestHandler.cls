/**
*   @Author:    Sriram Bandi
*   @Date:      
*   @Project:   Tito(Transfer In Transfer Out)
*   @Purpose:   Before Creting CC Request we are checking the all kind validations, After validations we are populating some fields from other objects.
*/
public without sharing class Tito_CC_RequestHandler extends DefaultTriggerHandler{

    public override void bulkBefore()
    {
       if(Trigger.isInsert){
          Tito_CCRequestUtil.verifyGLCompliance((List<Tito_CC_Request__c>) Trigger.new);
          Tito_CCRequestUtil.verifySCOACompliance((List<Tito_CC_Request__c>) Trigger.new);
          Tito_CCRequestUtil.updateHeirarchyValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
          Tito_CCRequestUtil.updateCcMasetrMapingValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
          Tito_CCRequestUtil.updateCurrencyValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
      }
      if(Trigger.isUpdate)
       {
          Tito_CCRequestUtil.verifyOldCcRequest((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
          Tito_CCRequestUtil.updateCcMasetrMapingValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
          Tito_CCRequestUtil.updateCurrencyValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
          Tito_CCRequestUtil.updateHeirarchyValues((List<Tito_CC_Request__c>) Trigger.new,(Map<Id,Tito_CC_Request__c>)Trigger.oldMap);
      }
    }

}