interface Window {
  WidgetCheckout?: new (options: {
    currency: string;
    amountInCents: number;
    reference: string;
    publicKey: string;
    redirectUrl: string;
    signature: {
      integrity: string;
    };
    customerData: {
      email: string;
      fullName: string;
      phoneNumber: string;
      phoneNumberPrefix: string;
    };
  }) => {
    open: (callback: (result: unknown) => void) => void;
  };
}
