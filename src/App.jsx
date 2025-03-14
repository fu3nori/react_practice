import { useState } from "react"
import Title from "./components/Title"
import Form from "./components/Form"
import Results from "./components/Results"
import Loading from "./components/Loading"

const App = () => {
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState("")
    const [results, setResults] = useState({
        country: "",
        cityName: "",
        temperature: "",
        conditionText: "",
        icon: ""
    })

    const getWeather = (e) => {
        e.preventDefault()
        setLoading(true)

        // Vite の場合、環境変数は import.meta.env から取得する
        const baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        const aqi = import.meta.env.VITE_WEATHER_API_AQI

        // デバッグ用：環境変数の値を確認
        console.log("baseUrl:", baseUrl)
        console.log("apiKey:", apiKey)
        console.log("aqi:", aqi)

        fetch(`${baseUrl}?key=${apiKey}&q=${city}&aqi=${aqi}`)
            .then(res => res.json())
            .then(data => {
                setResults({
                    country: data.location.country,
                    cityName: data.location.name,
                    temperature: data.current.temp_c,
                    conditionText: data.current.condition.text,
                    icon: data.current.condition.icon
                })
                setLoading(false)
                setCity("")
            })
            .catch(() => {
                alert("エラーが発生しました。ページをリロードして、もう一度入力してください")
                setLoading(false)
            })
    }

    return (
        <div className="wrapper">
            <div className="container">
                <Title/>
                <Form 
                    setCity={setCity}
                    getWeather={getWeather}
                    city={city}
                />
                {loading ? <Loading/> : <Results results={results}/>}
            </div>
        </div>
    )
}

export default App
