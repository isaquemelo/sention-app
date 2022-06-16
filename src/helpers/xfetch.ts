//@ts-ignore
export default function xfetch(...args) {
    // tell the proxy to make the request
    const ms = new MessageChannel
    //@ts-ignore

    popup.postMessage(args, '*', [ms.port1])

    // Resolves when the headers comes
    return new Promise((rs, rj) => {

        // First message will resolve the Response Object
        ms.port2.onmessage = ({ data }) => {
            const stream = new ReadableStream({
                start(controller) {

                    // Change the onmessage to pipe the remaning request
                    ms.port2.onmessage = evt => {
                        if (evt.data === true) // Done?
                            controller.close()
                        else // enqueue the buffer to the stream
                            controller.enqueue(evt.data)
                    }
                }
            })

            // Construct a new response with the
            // response headers and a stream
            rs(new Response(stream, data))
        }
    })
}
