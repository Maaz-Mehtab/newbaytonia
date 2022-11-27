import { updateLanguage } from '../screens/Home';
export var StringConstants = {}
import { english, arabic } from './Language';
setSetting(english)
export function updatelan(item) {
    try {
        setSetting(item)
        updateLanguage();
    }
    catch (e) {
        console.log("Exception", e);
    }
}

function setSetting(item) {

    try {
        StringConstants = {
            loginPageHeader: item.loginPageHeader,
            labelLogin: item.labelLogin,
            labelEmailUsername: item.labelEmailUsername,
            passwordLabel: item.passwordLabel,
            labelLoginButton: item.labelLoginButton,
            forgotPasswordLabel: item.forgotPasswordLabel,
            emailOrUsernameCannotBeEmptyLabel: item.emailOrUsernameCannotBeEmptyLabel,
            enterValidEmailLabel: item.enterValidEmailLabel,
            passwordCannotBeEmptyLabel: item.passwordCannotBeEmptyLabel,
            pleaseWaitTextLabel: item.pleaseWaitTextLabel,
            loadingTextLabel: item.loadingTextLabel,
            emailCannotBeEmptyLabel: item.emailCannotBeEmptyLabel,
            PressBackAgainToExitTheApplicationLabel: item.PressBackAgainToExitTheApplicationLabel,
            LinkSentLabel: item.LinkSentLabel,
            RequestFailedLabel: item.RequestFailedLabel,
            ForgotPasswordRequestFailMessageLabel: item.ForgotPasswordRequestFailMessageLabel,
            EmailAddressLabel: item.EmailAddressLabel,
            CancelButtonLabel: item.CancelButtonLabel,
            OkButtonLabel: item.OkButtonLabel,
            ForgotPasswordDialogTitle: item.ForgotPasswordDialogTitle,
            ForgotPasswordDialogDescription: item.ForgotPasswordDialogDescription,
            DeliveryBoyStatusPrefixLabel: item.DeliveryBoyStatusPrefixLabel,
            AssignedOrderLabel: item.AssignedOrderLabel,
            AcceptOrderLabel: item.AcceptOrderLabel,
            DeliveredOrderLabel: item.DeliveredOrderLabel,
            DeliveredOrderLabel: item.DeliveredOrderLabel,
            InvoicedOrderLabel: item.InvoicedOrderLabel,
            DashboardOrdersLabel: item.DashboardOrdersLabel,
            LogoutLabel: item.LogoutLabel,
            LogoutAlertTitle: item.LogoutAlertTitle,
            LogoutAlertBody: item.LogoutAlertBody,
            LogoutAlertSuccessButtonLabel: item.LogoutAlertSuccessButtonLabel,
            LogoutSuccessfulMessage: item.LogoutSuccessfulMessage,
            BackButtonLabel: item.BackButtonLabel,
            DashboardPageTitle: item.DashboardPageTitle,
            OrderDetailsPageTitle: item.OrderDetailsPageTitle,
            DrawerDashboardLabel: item.DrawerDashboardLabel,
            DrawerOrdersLabel: item.DrawerOrdersLabel,
            DrawerSettingsLabel: item.DrawerSettingsLabel,
            EmptyOrderListPageMessage: item.EmptyOrderListPageMessage,
            OrderNumberPrefix: item.OrderNumberPrefix,
            OrderDatePrefix: item.OrderDatePrefix,
            DenyOrderAlertTitle: item.DenyOrderAlertTitle,
            DenyOrderAlertBody: item.DenyOrderAlertBody,
            DenyOrderAlertSuccessButtonLabel: item.DenyOrderAlertSuccessButtonLabel,
            EmptyorderDetailsPageMessage: "How Did you land here ? \nThere\'s something wrong \nEither Go Back or if you are 100% sure this order belongs to you then you can contact the seller/administrator of the Website ",
            OrderNameLabelPrefix: item.OrderNameLabelPrefix,
            OrderIdTextLabelPrefix: item.OrderIdTextLabelPrefix,
            PickingIdTextLabelPrefix: item.PickingIdTextLabelPrefix,
            AssignDateTextLabelPrefix: item.AssignDateTextLabelPrefix,
            OrderDeliveryAddressLabel: item.OrderDeliveryAddressLabel,
            OrderDetailsTextLabel: item.OrderDetailsTextLabel,
            CustomerDetailsTextLabel: item.CustomerDetailsTextLabel,
            ProductDetailsTextLabel: item.ProductDetailsTextLabel,
            ProductNameLabel: item.ProductNameLabel,
            QtyToDeliverLabel: item.QtyToDeliverLabel,
            AcceptorderButtonLabel: item.AcceptorderButtonLabel,
            DenyOrderButtonLabel: item.DenyOrderButtonLabel,
            ShowonMapLabel: item.ShowonMapLabel,
            MapRoutePageHeaderLabel: item.MapRoutePageHeaderLabel,
            DeliveryLocationNotAvailable: item.DeliveryLocationNotAvailable,
            LocationPermissionTitle: item.LocationPermissionTitle,
            LocationPermissionBody: item.LocationPermissionBody,
            CurrentLocationNotAvailable: item.CurrentLocationNotAvailable,
            DeliveryAddressMapMarkerTitle: item.DeliveryAddressMapMarkerTitle,
            DeliveryBoyMapMarkerTitle: item.DeliveryBoyMapMarkerTitle,
            StartNavigation: item.StartNavigation,
            OrderDeliveredButtonLabel: item.OrderDeliveredButtonLabel,
            VerifyOTP: item.VerifyOTP,
            EnterDeliveryOTP: item.EnterDeliveryOTP,
            DeliveryOTP: item.DeliveryOTP,
            OTPCannotBeEmptyLabel: item.OTPCannotBeEmptyLabel,
            EnterValidOTPValue: item.EnterValidOTPValue,
            SettingsPageTitle: item.SettingsPageTitle,
            AllpickingsPageTitle: item.AllpickingsPageTitle,
            OrderDetailsPageAmountLabel: item.OrderDetailsPageAmountLabel,
            OrderDetailsPageStatusLabel: item.OrderDetailsPageStatusLabel,
            OrderDetailsTelephoneLabel: item.OrderDetailsTelephoneLabel,
            OrderDetailsMobileLabel: item.OrderDetailsMobileLabel,
            OrderDetailsEmailLabel: item.OrderDetailsEmailLabel,
            OrderDetailsSubtotalLabel: item.OrderDetailsSubtotalLabel,
            OrderDetailsTaxLabel: item.OrderDetailsTaxLabel,
            OrderDetailsGrandTotalLabel: item.OrderDetailsGrandTotalLabel,
            AmountDueLabel: item.AmountDueLabel,
            TotalOrdersDeliveredLabel: item.TotalOrdersDeliveredLabel,
            TotalEarningsReceivedLabel: item.TotalEarningsReceivedLabel,
            TotalNumberOfBoxes: item.TotalNumberOfBoxes,
            CustomerContact: item.CustomerContact,
            arabic: item.arabic,
            english: item.english,


            OrderReturned:item.OrderReturned,
            MyOrders:item.MyOrders,
            DELIVERY :item.DELIVERY,
            RETURN :item.RETURN,
            AssignedOrders:item.AssignedOrders,
            AcceptedOrders:item.AcceptedOrders,
            CompletedOrders:item.CompletedOrders,
            Order:item.Order,
            ReturnOrder:item.ReturnOrder,
            Return:item.Return,
            OrderDate:item.OrderDate
        }
    } catch (e) {
        console.log("Exception", e)
    }
}