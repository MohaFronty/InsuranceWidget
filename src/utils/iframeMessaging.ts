// Iframe messaging utilities for integration with parent websites

export interface IframeMessage {
  type: 'ONBOARDING_STEP_CHANGE' | 'ONBOARDING_COMPLETE' | 'RESIZE_REQUEST' | 'ERROR';
  payload?: any;
}

export class IframeMessenger {
  private static instance: IframeMessenger;
  private isInIframe: boolean;

  constructor() {
    this.isInIframe = window.self !== window.top;
  }

  static getInstance(): IframeMessenger {
    if (!IframeMessenger.instance) {
      IframeMessenger.instance = new IframeMessenger();
    }
    return IframeMessenger.instance;
  }

  // Send message to parent window
  sendToParent(message: IframeMessage): void {
    if (this.isInIframe && window.parent) {
      window.parent.postMessage({
        source: 'insurance-onboarding-widget',
        ...message
      }, '*');
    }
  }

  // Listen for messages from parent
  onParentMessage(callback: (message: any) => void): () => void {
    const handler = (event: MessageEvent) => {
      // Validate message source for security
      if (event.data && event.data.source === 'insurance-parent-site') {
        callback(event.data);
      }
    };

    window.addEventListener('message', handler);

    // Return cleanup function
    return () => window.removeEventListener('message', handler);
  }

  // Request parent to resize iframe
  requestResize(height: number, width?: number): void {
    this.sendToParent({
      type: 'RESIZE_REQUEST',
      payload: { height, width }
    });
  }

  // Notify step change
  notifyStepChange(step: number, stepName: string): void {
    this.sendToParent({
      type: 'ONBOARDING_STEP_CHANGE',
      payload: { step, stepName }
    });
  }

  // Notify completion
  notifyCompletion(applicationData: any): void {
    this.sendToParent({
      type: 'ONBOARDING_COMPLETE',
      payload: applicationData
    });
  }

  // Notify error
  notifyError(error: string): void {
    this.sendToParent({
      type: 'ERROR',
      payload: { error }
    });
  }

  // Check if running in iframe
  isRunningInIframe(): boolean {
    return this.isInIframe;
  }
}

export default IframeMessenger;
