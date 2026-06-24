import axios from 'axios';
import  acqusitions  from './datasets/acqusitions.json';


async function runEvaluation() {
    let passed = 0;
    for (const test of acqusitions) {
        const response = await axios.post(
            'http://localhost:3000/generate', {
                prompt: test.question
            }
        );

        const answer = response.data.response.toLowerCase();

        const expected = test.expected.toLowerCase();

        const success =
            answer.includes(expected);

        console.log(
            `${success ?  "Pass" : "Fail"} - ${test.question}`
        );

        if (success) {
            passed++;
        }
        console.log("\n==================");
        console.log(
            `Passed: ${passed}/${acqusitions.length}`
        );

        console.log(
            `Accuracy: ${(
                (passed /
                    acqusitions.length) *
                100
            ).toFixed(2)}%`
        );
    }
}

runEvaluation();