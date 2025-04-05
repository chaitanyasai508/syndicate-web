import api from '@/lib/api/axios';

type EventSourceOptions = {
  payload: any;
  onMessage: (data: any) => void;
  onError: (error: any) => void;
  onClose: () => void;
};

export class CustomEventSource {
  private controller: AbortController;
  private url: string;
  private options: EventSourceOptions;

  constructor(url: string, options: EventSourceOptions) {
    this.url = url;
    this.options = options;
    this.controller = new AbortController();
    this.connect();
  }

  private async connect() {
    try {
      const response = await api({
        method: 'POST',
        url: this.url,
        data: this.options.payload,
        responseType: 'text',
        headers: {
          'Accept': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
        // Enable axios to receive partial responses
        onDownloadProgress: (progressEvent) => {
          const data = progressEvent.event.target?.response || '';
          this.processChunk(data);
        }
      });

    } catch (error:any) {
      if (error.name === 'AbortError') {
        return;
      }
      this.options.onError(error);
    }
  }

  private processChunk(chunk: string) {
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6); // Remove 'data: ' prefix
        try {
          if (data === '[DONE]') {
            this.close();
            this.options.onClose();
            return;
          }
          const parsedData = JSON.parse(data);
          this.options.onMessage(parsedData);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
    }
  }

  public close() {
    this.controller.abort();
  }
}