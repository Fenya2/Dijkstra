function checkElem(elem)
{
    if(elem.match(/[a-zA-Z]+/))
        return 'num';
    switch (elem)
    {
        case '(':
        case ')':
            return 'bracket';
        case '+':
        case '-':
        case '*':
        case '/':
        case '^':
            return 'operation';
        default:
            return 'error';
    }
}

function convertToPolandNotation(exp)
{
    let edExp = exp.split(/([+\-*\/^)(])/).filter(function (f){return f !== ''});
    let pNotation = [];
    let stack = [];
    let sp = -1;

    function getOpPriority(operation)
    {
        switch (operation)
        {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
        }
    }

    for(let i = 0; i < edExp.length; i++)
    {
        switch (checkElem(edExp[i]))
        {
            case 'num':
                pNotation.push(edExp[i]);
                break;
            case 'operation':
                while ( sp > 0 && stack[sp] !== '(' && getOpPriority(stack[sp]) >= getOpPriority(edExp[i]))
                {
                    pNotation.push(stack.pop());
                    sp--;
                }
                stack.push(edExp[i]);
                sp++;
                break;
            case 'bracket':
                switch (edExp[i])
                {
                    case '(':
                        stack.push(edExp[i]);
                        sp++;
                        break;
                    case ')':
                        while (stack[sp] !== '(') // todo добавить исключение
                        {
                            pNotation.push(stack.pop());
                            sp--;
                        }
                        stack.pop() // удаляем скобку
                        sp--;
                        break;
                }
                break;
            case 'error':
                console.error(`Type error on ${i} position.`);
                return null;
        }
    }
    while (sp >= 0)
    {
        pNotation.push(stack.pop());
        sp--;
    }
    return pNotation;
}

console.log(convertToPolandNotation(process.argv[2].toString()).join(" "));