from django.shortcuts import render

class Finance_ai(APIView):  
    def post(self, request):
        content = request.data.get("user_msg")
        past_convo = request.data.get("last5")
        print(content)
        ai_msg, citation = get_finance_response(content, past_convo)
        return Response({
                'ai_msg': ai_msg,
                'citation': citation
            }, status=200)
