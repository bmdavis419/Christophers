import React from 'react'

interface FaqCardInterface {
    question: string,
    answer: string
}

const FaqCard = (props: FaqCardInterface) => {
    const { question, answer } = props
    return (
        <div>
            <div className="bg-faqbox rounded-faqborder justify-items-center p-8">
                <div className="pl-faq pb-4">
                    <h3 className="text-primary text-headsm bg-grey-600">{question}</h3>    
                </div>
                <div>
                    <p className="text-standard text-center">{answer}</p>
                </div>
            </div>
            
        </div>
    )
}

export default FaqCard;