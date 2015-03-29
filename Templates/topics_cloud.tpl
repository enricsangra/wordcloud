<ul> 
	<% _.each(topics, function(topic) { %> 
		<li>
			<a href="#topic_cloud/<%= topic.slug %>">
				<span class="<%= topic.dominant_sentiment %>-topic importance-<%= topic.importance %> topic">
					<%= topic.label %>
				</span>
			</a>
		</li> 
	<% }); %> 
</ul>