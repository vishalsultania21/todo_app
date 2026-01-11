class node<T> {
    data : T;
    key :string
    next : node<T> | null;
    constructor(val : T , str:string)
    {
        this.data = val;
        this.next = null;
        this.key = str;
    }
}

class todoLinkedList<T>{

    head : node<T> | null;

    constructor(){
        this.head = null;
    }

    addNode(data : T , key:string):void
    {
        let newNode =  new node(data,key);
        if(this.head===null)
        {
            this.head = newNode
        }
        else{
            newNode.next = this.head;
            this.head = newNode;
        }
    }

    deleteNode(key:string):void{
        if(this.head===null)
            return;
        if(this.head.key===key){
                this.head=this.head.next;
                return
            }
        let temp:node<T> = this.head;
        while(temp.next !== null && temp.next.key !== key)
        {
            temp = temp.next;
        }
        if(temp.next === null)
            return;
        else
            temp.next=temp.next.next;
    }
    updateNode(key:string , newData: T):void{
        if(this.head===null)
            return;
        if(this.head.key===key){
                this.head.data=newData;
                return
            }
        let temp:node<T> = this.head;
        while(temp.next !== null && temp.next.key !== key)
        {
            temp = temp.next;
        }
        if(temp.next === null)
            return;
        else
            temp.next.data=newData;
    }
    getSerializedList(): any[]
    {
        const items: any[] = [];
        let current = this.head;
        while(current)
        {
            items.push({key:current.key, data:current.data})
            current = current.next;
        }
        return items;
    }
}


export default todoLinkedList;