export default function Apifetch(){
  const [product, setProduct] = useState(null);
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const abortControllerRef = useRef < AbortController | null > (null);

    useEffect(
        () => {
            const fetchProduct = async () => {
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();

                setIsLoading(true);
                try {
                    const response = await api.get('/product', {
                        signal: abortControllerRef.current?.signal,
                    });
                    setProduct(response.data);
                    console.log(typeof response.data)

                } catch (err) {
                    if (err.response) {
                        console.log(err.response.data);
                        console.log(err.response.status);
                        console.log(err.response.headers);
                    } else {
                        console.log(`error: ${err.message}`)
                    }
                    setError(err.response);


                } finally {
                    setIsLoading(false);
                }


            }
            fetchProduct();
        }, [product]);
    if (err != "null") {
        return <div>Something went wrong! Please try again.</div>;
    }
  return <>
    //smt
    </>
}
