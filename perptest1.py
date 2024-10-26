import requests
import datetime

# Set up your API key and endpoint
API_KEY = "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"  # Replace this with your actual API key
ENDPOINT = "https://api.perplexity.ai/chat/completions"

# Define the model you wish to use (consult Perplexity's documentation for model options)
MODEL_NAME = "llama-3.1-sonar-small-128k-online"  # Replace with the name of a supported model

# Initialize conversation history
conversation_history = []

# Define a function to interact with the Perplexity API
def ask_perplexity(question):
    # Append the user message to the conversation history
    conversation_history.append({"role": "user", "content": question})

    # Prepare the request payload
    data = {
        "model": MODEL_NAME,
        "messages": conversation_history,
        "return_citations": True,
        "return_images": False,
        "return_related_questions": False,
        "stream": False
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    # Send the request to the API
    response = requests.post(ENDPOINT,  headers=headers, json=data)

    # Check for a successful response
    if response.status_code == 200:
        response_data = response.json()
        # Extract the chatbot's response text
        bot_response = response_data.get("choices", [{}])[0].get("message", {}).get("content", "No response")
        # Append the bot response to the conversation history
        conversation_history.append({"role": "assistant", "content": bot_response})
        return bot_response
    else:
        # Print debugging information if there's an error
        print("Debug Info - Status Code:", response.status_code)
        print("Debug Info - Response Content:", response.content.decode())
        return "Error in response. Please try again."
fp = [{'comment_id': '1257448878711985', 'comment_url': 'https://facebook.com/1257448878711985', 'commenter_id': '1679306690', 'commenter_url': None, 'commenter_name': 'Connie McGuckin', 'commenter_meta': None, 'comment_text': 'Mater Ramos Loteria First time voters', 'comment_time': datetime.datetime(2024, 10, 25, 1, 0), 'comment_image': None, 'comment_reactors': [], 'comment_reactions': None, 'comment_reaction_count': None},
  {'comment_id': '3805673839691151', 'comment_url': 'https://facebook.com/3805673839691151', 'commenter_id': '1679306690', 'commenter_url': None, 'commenter_name': 'Connie McGuckin', 'commenter_meta': None, 'comment_text': 'Mater Ramos Loteria I hope you have your papers in order he make throw you’re out of the country. He had threatened many times.', 'comment_time': datetime.datetime(2024, 10, 25, 1, 0), 'comment_image': None, 'comment_reactors': [], 'comment_reactions': None, 'comment_reaction_count': None},
  {'comment_id': '1078676530549403', 'comment_url': 'https://facebook.com/1078676530549403', 'commenter_id': '61567687886909', 'commenter_url': None, 'commenter_name': 'Dr James ', 'commenter_meta': None, 'comment_text': "Mater Ramos Loteria Hello how are you doing? I'm sorry to bother you with my message, I was just scrolling on my update when I came across your name and profile then I was interested in knowing you, sending you a friend request without your consent will be rude, can you please send me a friend request or click on my message and text me for a better conversation if you don't mind..thanks God bless you", 'comment_time': datetime.datetime(2024, 10, 25, 1, 0), 'comment_image': None, 'comment_reactors': [], 'comment_reactions': None, 'comment_reaction_count': None},
  {'comment_id': '957128446451335', 'comment_url': 'https://facebook.com/957128446451335', 'commenter_id': '61567445065914', 'commenter_url': None, 'commenter_name': 'Johnny Bryant', 'commenter_meta': None, 'comment_text': "Mater Ramos Loteria Connect with Mrs Robert Allison 👇👇👇👇👇facebook.com/\nrobertallisonfxt\n\nYou'll definitely thank me later.", 'comment_time': datetime.datetime(2024, 10, 25, 5, 0), 'comment_image': None, 'comment_reactors': [], 'comment_reactions': None, 'comment_reaction_count': None}]
# Define a function to calculate credibility rating
def credibility_rating(facebook_posts):
    # Format the prompt for credibility analysis
    prompt = "Analyze the credibility of this individual based on the following Facebook posts:\n\n"
    for i, post in enumerate(facebook_posts, start=1):
        prompt += f"Post {i}: {post['comment_text']}\n\n"
    prompt += "Based on the information provided, give a credibility rating for this individual as a percentage .The output should only be the text in the bracket:(credibility rating: xx%) where xx is the credibility rating."

    # Get the credibility rating from Perplexity API
    response = ask_perplexity(prompt)
    
    # Assuming Perplexity will return a percentage credibility rating
    return response
"""
# Basic chat loop
print("Welcome to the Perplexity Chatbot! Type 'exit' to quit.")
while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Goodbye!")
        break
    
    # Get response from Perplexity API
    response = ask_perplexity(user_input)
    print("Bot:", response)
"""

print(credibility_rating(fp))
    
    
