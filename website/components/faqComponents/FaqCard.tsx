import React from 'react'

interface FaqCardInterface {
    question: string,
    answer: string
}

const FaqCard = (props: FaqCardInterface) => {
    const { question, answer } = props
    return (
        <div>
            <div className="rounded-faqborder bg-gray-200 justify-items-center  p-8">
                <div className="xl:pl-faq pb-4">
                    <h3 className="text-primary text-xl xl:text-3xl bg-grey-600">{question}</h3>    
                </div>
                <div>
                    <p className="text-md xl:text-xl text-center">{answer}</p>
                </div>
            </div>
            
        </div>
    )
}

export default FaqCard;