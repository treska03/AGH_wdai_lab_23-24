import '../../styles/faq.css'

export const FAQ = () => {
    return (
        <div className="faqContainer"> 
            <div className="questionContainer">
                <h3 className="question">1. Czy strona będzie dalej rozwijana?</h3><br/>
                <p className="answer">Nie</p>
            </div>
            <br/>
            <div className="questionContainer">
                <h3 className="question">2. Ile czasu poświęciliście na zrobienie tej strony?</h3><br/>
                <p className="answer">Za dużo</p>
            </div>
        </div>
    )
}